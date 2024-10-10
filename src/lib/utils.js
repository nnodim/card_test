import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function generateRandomToken(length = 10) {
  const generateRandomCharacter = () => Math.random().toString(36)[2];

  return Array.from({ length }, generateRandomCharacter).join("");
}

export const formatPrice = (price) => {
  return Number(price).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const passwordErrors = {
  empty: "Password cannot be empty",
  validationError:
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character",
  confirmPasswordError: "Passwords do not match",
};

export const numberWithinRange = (number, min, max) =>
  Math.min(Math.max(number, min), max);

export const BASE_URL = import.meta.env.VITE_BASE_URL;

export const findAvailableSpaceAcrossPages = (
  messages,
  maxPage,
  containerWidth,
  containerHeight
) => {
  // Default text box dimensions
  const defaultWidth = 300;
  const defaultHeight = 75;
  const padding = 10;

  // Grid system
  const gridCellWidth = defaultWidth + padding;
  const gridCellHeight = defaultHeight + padding;
  const columnsCount = Math.floor(containerWidth / gridCellWidth);
  const rowsCount = Math.floor(containerHeight / gridCellHeight);


  // Function to check if a space is available on a specific page
  const checkSpaceOnPage = (pageNumber) => {

    const grid = Array(rowsCount)
      .fill()
      .map(() => Array(columnsCount).fill(false));

    // Mark occupied spaces for this page
    const pageMessages = messages.filter((msg) => msg.page === pageNumber);

    pageMessages.forEach((msg) => {
      const startCol = Math.floor(msg.x / gridCellWidth);
      const startRow = Math.floor(msg.y / gridCellHeight);
      const endCol = Math.min(
        Math.ceil((msg.x + msg.width) / gridCellWidth),
        columnsCount
      );
      const endRow = Math.min(
        Math.ceil((msg.y + msg.height) / gridCellHeight),
        rowsCount
      );

      for (let row = startRow; row < endRow; row++) {
        for (let col = startCol; col < endCol; col++) {
          if (row >= 0 && row < rowsCount && col >= 0 && col < columnsCount) {
            grid[row][col] = true;
          }
        }
      }
    });

    // Find available space in this page
    for (let row = 0; row < rowsCount; row++) {
      for (let col = 0; col < columnsCount; col++) {
        if (!grid[row][col]) {
          let canFit = true;
          const neededRows = Math.ceil(defaultHeight / gridCellHeight);
          const neededCols = Math.ceil(defaultWidth / gridCellWidth);

          // Check if we have enough space
          for (
            let r = row;
            r < Math.min(row + neededRows, rowsCount) && canFit;
            r++
          ) {
            for (
              let c = col;
              c < Math.min(col + neededCols, columnsCount) && canFit;
              c++
            ) {
              if (grid[r][c]) {
                canFit = false;
              }
            }
          }

          if (canFit) {
            const position = {
              x: col * gridCellWidth,
              y: row * gridCellHeight,
              width: defaultWidth,
              height: defaultHeight,
              page: pageNumber,
            };
            return {
              found: true,
              position,
            };
          }
        }
      }
    }

    return { found: false };
  };

  // Check each page for available space, starting from page 1
  for (let page = 1; page < maxPage; page++) {
    const result = checkSpaceOnPage(page);
    if (result.found) {
      return result.position;
    }
  }

  // If no space found on existing pages, calculate position for last page
  const lastPage = maxPage - 1;  
  const lastPageMessages = messages.filter((msg) => msg.page === lastPage);
  const highestY = lastPageMessages.reduce(
    (max, msg) => Math.max(max, msg.y + msg.height),
    0
  );

  const fallbackPosition = {
    x: padding,
    y: highestY + padding,
    width: defaultWidth,
    height: defaultHeight,
    page: lastPage,
  };

  return fallbackPosition;
};