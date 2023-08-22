// Adapted from https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/

import {
  createEffect,
  createMemo,
  createSelector,
  createSignal,
  type JSX,
  on,
  onMount,
  splitProps,
} from "solid-js";
import clsx from "clsx";
import type { Feature } from "../types";

// Save a list of named combobox actions, for future readability
const SelectActions = {
  Close: 0,
  CloseSelect: 1,
  First: 2,
  Last: 3,
  Next: 4,
  Open: 5,
  PageDown: 6,
  PageUp: 7,
  Previous: 8,
  Select: 9,
  Type: 10,
};

// filter an array of options against an input string
// returns an array of options that begin with the filter string, case-independent
function filterOptions(
  options: string[] = [],
  filter: string,
  exclude: string[] = [],
) {
  return options.filter((option) => {
    const matches = option.toLowerCase().indexOf(filter.toLowerCase()) === 0;
    return matches && exclude.indexOf(option) < 0;
  });
}

// map a key press to an action
function getActionFromKey(event: KeyboardEvent, menuOpen: boolean) {
  const { key, altKey, ctrlKey, metaKey } = event;
  const openKeys = ["ArrowDown", "ArrowUp", "Enter", " "]; // all keys that will do the default open action
  // handle opening when closed
  if (!menuOpen && openKeys.includes(key)) {
    return SelectActions.Open;
  }

  // home and end move the selected option when open or closed
  if (key === "Home") {
    return SelectActions.First;
  }
  if (key === "End") {
    return SelectActions.Last;
  }

  // handle typing characters when open or closed
  if (
    key === "Backspace" ||
    key === "Clear" ||
    (key.length === 1 && key !== " " && !altKey && !ctrlKey && !metaKey)
  ) {
    return SelectActions.Type;
  }

  // handle keys when open
  if (menuOpen) {
    if (key === "ArrowUp" && altKey) {
      return SelectActions.CloseSelect;
    } else if (key === "ArrowDown" && !altKey) {
      return SelectActions.Next;
    } else if (key === "ArrowUp") {
      return SelectActions.Previous;
    } else if (key === "PageUp") {
      return SelectActions.PageUp;
    } else if (key === "PageDown") {
      return SelectActions.PageDown;
    } else if (key === "Escape") {
      return SelectActions.Close;
    } else if (key === "Enter" || key === " ") {
      return SelectActions.CloseSelect;
    }
  }
}

// return the index of an option from an array of options, based on a search string
// if the filter is multiple iterations of the same letter (e.g "aaa"), then cycle through first-letter matches
function getIndexByLetter(options: string[], filter: string, startIndex = 0) {
  const orderedOptions = [
    ...options.slice(startIndex),
    ...options.slice(0, startIndex),
  ];
  const firstMatch = filterOptions(orderedOptions, filter)[0];
  const allSameLetter = (array) => array.every((letter) => letter === array[0]);

  // first check if there is an exact match for the typed string
  if (firstMatch) {
    return options.indexOf(firstMatch);
  }

  // if the same letter is being repeated, cycle through first-letter matches
  else if (allSameLetter(filter.split(""))) {
    const matches = filterOptions(orderedOptions, filter[0]);
    return options.indexOf(matches[0]);
  }

  // if no matches, return -1
  else {
    return -1;
  }
}

// get an updated option index after performing an action
function getUpdatedIndex(
  currentIndex: number,
  maxIndex: number,
  action: number,
) {
  const pageSize = 10; // used for pageup/pagedown

  switch (action) {
    case SelectActions.First:
      return 0;
    case SelectActions.Last:
      return maxIndex;
    case SelectActions.Previous:
      return Math.max(0, currentIndex - 1);
    case SelectActions.Next:
      return Math.min(maxIndex, currentIndex + 1);
    case SelectActions.PageUp:
      return Math.max(0, currentIndex - pageSize);
    case SelectActions.PageDown:
      return Math.min(maxIndex, currentIndex + pageSize);
    default:
      return currentIndex;
  }
}

// check if element is visible in browser view port
function isElementInView(element: Element) {
  const bounding = element.getBoundingClientRect();

  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
}

// check if an element is currently scrollable
function isScrollable(element: Element) {
  return element && element.clientHeight < element.scrollHeight;
}

// ensure a given child element is within the parent's visible scroll area
// if the child is not visible, scroll the parent
function maintainScrollVisibility(
  activeElement: Element,
  scrollParent: Element,
) {
  const { offsetHeight, offsetTop } = activeElement;
  const { offsetHeight: parentOffsetHeight, scrollTop } = scrollParent;

  const isAbove = offsetTop < scrollTop;
  const isBelow = offsetTop + offsetHeight > scrollTop + parentOffsetHeight;

  if (isAbove) {
    scrollParent.scrollTo(0, offsetTop);
  } else if (isBelow) {
    scrollParent.scrollTo(0, offsetTop - parentOffsetHeight + offsetHeight);
  }
}

export function ListBox(
  props: JSX.OptionHTMLAttributes<Element> & {
    disabled?: boolean;
    options: Feature[];
    onChange?: (value: string) => unknown;
  },
) {
  let selectEl: Element;
  let comboEl: Element;
  let listboxEl: Element;

  const [activeIndex, setActiveIndex] = createSignal(0);
  const [selectedIndex, setSelectedIndex] = createSignal(0);
  const [isOpen, setIsOpen] = createSignal(false);

  let searchString = "";
  let searchTimeout = null;
  let ignoreBlur = false;

  const [local, others] = splitProps(props, ["options", "class", "onChange"]);

  const nonDisabledIndices = createMemo(() =>
    props.options.map((o, i) => (o.disabled ? -1 : i)).filter((i) => i !== -1),
  );

  onMount(() => {
    setSelectedIndex(0);
  });

  createEffect(
    on(selectedIndex, (index) => {
      props.onChange?.(props.options[index].value);
    }),
  );

  const isActive = createSelector(activeIndex);

  function onOptionClick(index: number) {
    if (!props.options[index].disabled) {
      onOptionChange(index);
      setSelectedIndex(index);
    }
    updateMenuState(false);
  }

  function onOptionMouseDown() {
    // Clicking an option will cause a blur event,
    // but we don't want to perform the default keyboard blur action
    ignoreBlur = true;
  }

  function onOptionChange(index: number) {
    // update state
    setActiveIndex(nonDisabledIndices()[index]);

    // update active option styles
    const options = selectEl.querySelectorAll("[role=option]");

    // ensure the new option is in view
    if (isScrollable(listboxEl)) {
      maintainScrollVisibility(options[index], listboxEl);
    }

    // ensure the new option is visible on screen
    if (!isElementInView(options[index])) {
      options[index].scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  function updateMenuState(open: boolean, callFocus = true) {
    if (isOpen() === open) {
      return;
    }

    // update state
    setIsOpen(open);

    if (!open && !isElementInView(comboEl)) {
      comboEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    // move focus back to the combobox, if needed
    callFocus && selectEl.focus();
  }

  function onComboBlur() {
    // do not do blur action if ignoreBlur flag has been set
    if (ignoreBlur) {
      ignoreBlur = false;
      return;
    }

    // select current option and close
    if (isOpen()) {
      setSelectedIndex(activeIndex());
      updateMenuState(false, false);
    }
  }

  function onComboClick() {
    if (props.disabled) return;
    updateMenuState(!isOpen());
  }

  function onComboKeyDown(event: KeyboardEvent) {
    if (props.disabled) return;
    const { key } = event;
    const max = nonDisabledIndices().length - 1;

    const action = getActionFromKey(event, isOpen());

    switch (action) {
      case SelectActions.Last:
      case SelectActions.First:
        updateMenuState(true);
      // intentional fallthrough
      case SelectActions.Next:
      case SelectActions.Previous:
      case SelectActions.PageUp:
      case SelectActions.PageDown:
        event.preventDefault();
        return onOptionChange(
          getUpdatedIndex(
            nonDisabledIndices().findIndex(isActive),
            max,
            action,
          ),
        );
      case SelectActions.CloseSelect:
        event.preventDefault();
        setSelectedIndex(activeIndex());
      // intentional fallthrough
      case SelectActions.Close:
        event.preventDefault();
        return updateMenuState(false);
      case SelectActions.Type:
        return onComboType(key);
      case SelectActions.Open:
        event.preventDefault();
        return updateMenuState(true);
    }
  }

  function onComboType(letter: string) {
    // open the listbox if it is closed
    updateMenuState(true);

    // find the index of the first matching option
    const localSearchString = getSearchString(letter);
    const searchIndex = getIndexByLetter(
      props.options.map((o) => o.label),
      localSearchString,
      activeIndex() + 1,
    );

    // if a match was found, go to it
    if (searchIndex >= 0) {
      onOptionChange(searchIndex);
    }
    // if no matches, clear the timeout and search string
    else {
      clearTimeout(searchTimeout);
      searchString = "";
    }
  }

  function getSearchString(char: string) {
    // reset typing timeout and start new timeout
    // this allows us to make multiple-letter matches, like a native select
    if (typeof searchTimeout === "number") {
      clearTimeout(searchTimeout);
    }

    searchTimeout = setTimeout(() => {
      searchString = "";
    }, 500);

    // add most recent letter to saved search string
    searchString += char;
    return searchString;
  }

  return (
    <div
      {...others}
      aria-disabled={props.disabled}
      class={clsx("listbox", local.class)}
      ref={selectEl}
      tabIndex={props.disabled ? -1 : 0}
      onBlur={onComboBlur}
      onClick={onComboClick}
      onKeyDown={onComboKeyDown}
    >
      <div
        aria-controls={`listbox-${props.id}`}
        aria-expanded={isOpen()}
        aria-haspopup="listbox"
        // aria-labelledby={`combo-label-${props.id}`}
        id={`combo-${props.id}`}
        role="combobox"
        tabIndex="-1"
        ref={comboEl}
      >
        {props.options[selectedIndex()].label}
      </div>
      <div
        role="listbox"
        id={`listbox-${props.id}`}
        // aria-labelledby={`combo-label-${props.id}`}
        aria-activedescendant={`listboxitem-${props.id}-${activeIndex()}`}
        tabIndex="-1"
        ref={listboxEl}
      >
        <For each={props.options}>
          {(option, index) => (
            <div
              role="option"
              id={`listboxitem-${props.id}-${index()}`}
              aria-selected={isActive(index())}
              aria-disabled={option.disabled}
              onClick={(e) => {
                e.stopPropagation();
                onOptionClick(index());
              }}
              onMouseDown={onOptionMouseDown}
            >
              {option.label}
            </div>
          )}
        </For>
      </div>
    </div>
  );
}
