"use client"

import * as React from "react"
import { CheckIcon, ChevronsUpDownIcon, SearchIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function SearchableSelect({
  value,
  onValueChange,
  options = [],
  placeholder = "Selecione...",
  searchPlaceholder = "Buscar...",
  emptyMessage = "Nenhum resultado encontrado.",
  disabled = false,
  clearable = true,
  className,
  triggerClassName,
  contentClassName,
}) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const containerRef = React.useRef(null)

  const selectedOption = options.find((option) => option.value === value)

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
      React.startTransition(() => {
        setSearch("")
      })
    }
  }, [open])

  function handleSelect(optionValue) {
    onValueChange?.(optionValue)
    setOpen(false)
    setSearch("")
  }

  function handleClear(event) {
    event.stopPropagation()
    onValueChange?.("")
    setSearch("")
  }

  return (
    <div
      ref={containerRef}
      data-slot="searchable-select"
      className={cn("relative w-full", className)}
    >
      <Button
        type="button"
        variant="outline"
        disabled={disabled}
        aria-expanded={open}
        data-slot="searchable-select-trigger"
        className={cn(
          "h-9 w-full justify-between gap-2 px-2.5 font-normal",
          !selectedOption && "text-muted-foreground",
          triggerClassName
        )}
        onClick={() => setOpen((current) => !current)}
      >
        <span className="line-clamp-1 text-left">
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        <span className="flex items-center gap-1">
          {clearable && selectedOption && !disabled && (
            <span
              role="button"
              tabIndex={0}
              aria-label="Limpar seleção"
              className="rounded-sm p-0.5 text-muted-foreground hover:text-foreground"
              onClick={handleClear}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  handleClear(event)
                }
              }}
            >
              <XIcon className="size-3.5" />
            </span>
          )}

          <ChevronsUpDownIcon className="size-4 shrink-0 text-muted-foreground" />
        </span>
      </Button>

      {open && (
        <div
          data-slot="searchable-select-content"
          className={cn(
            "absolute top-[calc(100%+4px)] left-0 z-50 w-full overflow-hidden rounded-md bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 animate-in fade-in-0 zoom-in-95",
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

          <div className="max-h-64 overflow-y-auto p-1">
            {filteredOptions.length === 0 && (
              <div className="px-2 py-6 text-center text-sm text-muted-foreground">
                {emptyMessage}
              </div>
            )}

            {filteredOptions.map((option) => {
              const selected = option.value === value

              return (
                <button
                  key={option.value}
                  type="button"
                  disabled={option.disabled}
                  data-slot="searchable-select-item"
                  data-selected={selected}
                  className={cn(
                    "relative flex w-full cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm outline-none select-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50",
                    selected && "bg-accent text-accent-foreground"
                  )}
                  onClick={() => handleSelect(option.value)}
                >
                  <CheckIcon
                    className={cn(
                      "size-4 shrink-0",
                      selected ? "opacity-100" : "opacity-0"
                    )}
                  />

                  <span className="flex flex-col">
                    <span className="line-clamp-1">{option.label}</span>

                    {option.description && (
                      <span className="line-clamp-1 text-xs text-muted-foreground">
                        {option.description}
                      </span>
                    )}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export { SearchableSelect }