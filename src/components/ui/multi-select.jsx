"use client"

import * as React from "react"
import {
  CheckIcon,
  ChevronsUpDownIcon,
  SearchIcon,
  XIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"

function MultiSelect({
  value = [],
  onValueChange,
  options = [],
  placeholder = "Selecione...",
  searchPlaceholder = "Buscar...",
  emptyMessage = "Nenhum resultado encontrado.",
  disabled = false,
  maxVisible = 2,
  className,
  triggerClassName,
  contentClassName,
}) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const containerRef = React.useRef(null)

  const selectedOptions = React.useMemo(() => {
    return options.filter((option) => value.includes(option.value))
  }, [options, value])

  const filteredOptions = React.useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    if (!normalizedSearch) return options

    return options.filter((option) => {
      const label = String(option.label ?? "").toLowerCase()
      const description = String(option.description ?? "").toLowerCase()
      const optionValue = String(option.value ?? "").toLowerCase()

      return (
        label.includes(normalizedSearch) ||
        description.includes(normalizedSearch) ||
        optionValue.includes(normalizedSearch)
      )
    })
  }, [options, search])

  const visibleOptions = selectedOptions.slice(0, maxVisible)
  const hiddenCount = selectedOptions.length - visibleOptions.length

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (!containerRef.current?.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  React.useEffect(() => {
    if (!open) {
      const id = setTimeout(() => {
        setSearch("")
      }, 0)

      return () => clearTimeout(id)
    }
  }, [open])

  function toggleOption(optionValue) {
    const alreadySelected = value.includes(optionValue)

    const nextValue = alreadySelected
      ? value.filter((item) => item !== optionValue)
      : [...value, optionValue]

    onValueChange?.(nextValue)
  }

  function removeOption(event, optionValue) {
    event.preventDefault()
    event.stopPropagation()

    onValueChange?.(value.filter((item) => item !== optionValue))
  }

  function clearAll(event) {
    event.preventDefault()
    event.stopPropagation()

    onValueChange?.([])
  }

  function handleOptionKeyDown(event, option) {
    if (option.disabled) return

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      toggleOption(option.value)
    }
  }

  return (
    <div
      ref={containerRef}
      data-slot="multi-select"
      className={cn("relative w-full", className)}
    >
      <Button
        type="button"
        variant="outline"
        disabled={disabled}
        aria-expanded={open}
        data-slot="multi-select-trigger"
        className={cn(
          "min-h-9 h-auto w-full justify-between gap-2 px-2.5 py-1.5 font-normal",
          selectedOptions.length === 0 && "text-muted-foreground",
          triggerClassName
        )}
        onClick={() => setOpen((current) => !current)}
      >
        <span className="flex min-w-0 flex-1 flex-wrap items-center gap-1 text-left">
          {selectedOptions.length === 0 && (
            <span className="line-clamp-1">{placeholder}</span>
          )}

          {visibleOptions.map((option) => (
            <Badge
              key={option.value}
              variant="secondary"
              className="h-6 max-w-40 gap-1 rounded-md pr-1"
            >
              <span className="line-clamp-1">{option.label}</span>

              <span
                role="button"
                tabIndex={0}
                aria-label={`Remover ${option.label}`}
                className="rounded-sm p-0.5 text-muted-foreground hover:text-foreground"
                onClick={(event) => removeOption(event, option.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    removeOption(event, option.value)
                  }
                }}
              >
                <XIcon className="size-3" />
              </span>
            </Badge>
          ))}

          {hiddenCount > 0 && (
            <Badge variant="outline" className="h-6 rounded-md">
              +{hiddenCount}
            </Badge>
          )}
        </span>

        <span className="flex shrink-0 items-center gap-1">
          {selectedOptions.length > 0 && !disabled && (
            <span
              role="button"
              tabIndex={0}
              aria-label="Limpar seleção"
              className="rounded-sm p-0.5 text-muted-foreground hover:text-foreground"
              onClick={clearAll}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  clearAll(event)
                }
              }}
            >
              <XIcon className="size-3.5" />
            </span>
          )}

          <ChevronsUpDownIcon className="size-4 text-muted-foreground" />
        </span>
      </Button>

      {open && (
        <div
          data-slot="multi-select-content"
          className={cn(
            "absolute left-0 top-[calc(100%+4px)] z-50 w-full overflow-hidden rounded-md bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 animate-in fade-in-0 zoom-in-95",
            contentClassName
          )}
        >
          <div className="flex items-center border-b px-2">
            <SearchIcon className="mr-2 size-4 shrink-0 text-muted-foreground" />

            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={searchPlaceholder}
              className="h-9 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0 dark:bg-transparent"
              autoFocus
            />
          </div>

          <div
            role="listbox"
            aria-multiselectable="true"
            className="max-h-64 overflow-y-auto p-1"
          >
            {filteredOptions.length === 0 && (
              <div className="px-2 py-6 text-center text-sm text-muted-foreground">
                {emptyMessage}
              </div>
            )}

            {filteredOptions.map((option) => {
              const selected = value.includes(option.value)

              return (
                <div
                  key={option.value}
                  role="option"
                  tabIndex={option.disabled ? -1 : 0}
                  aria-selected={selected}
                  aria-disabled={option.disabled}
                  data-slot="multi-select-item"
                  data-selected={selected}
                  data-disabled={option.disabled}
                  className={cn(
                    "relative flex w-full cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm outline-none select-none",
                    "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                    selected && "bg-accent text-accent-foreground",
                    option.disabled && "pointer-events-none opacity-50"
                  )}
                  onClick={() => {
                    if (!option.disabled) {
                      toggleOption(option.value)
                    }
                  }}
                  onKeyDown={(event) => handleOptionKeyDown(event, option)}
                >
                  <Checkbox
                    checked={selected}
                    tabIndex={-1}
                    aria-hidden="true"
                    className="pointer-events-none"
                  />

                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="line-clamp-1">{option.label}</span>

                    {option.description && (
                      <span className="line-clamp-1 text-xs text-muted-foreground">
                        {option.description}
                      </span>
                    )}
                  </span>

                  {selected && <CheckIcon className="size-4 shrink-0" />}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export { MultiSelect }