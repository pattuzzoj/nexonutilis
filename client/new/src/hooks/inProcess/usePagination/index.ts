import { Accessor, Setter, createEffect, createSignal } from "solid-js";

interface PaginationProps {
  value: boolean;
}

type PaginationReturn = [
  Accessor<boolean>,
  Setter<boolean>,
  utils: {
    toggleBoolean: VoidFunction
  }
]

function usePagination<T>(itemsPerPage: number, items: Array<T>) {
  const [currentIndexPage, setCurrentIndexPage] = createSignal<number>(0);
  const [currentPage, setCurrentPage] = createSignal<Array<T>>();

  const pages = Math.ceil(items.length / itemsPerPage);
  
  function getPage(index: number) {
    if(index >= 0 && index < pages) {
      const start = index * itemsPerPage;
      const end = start + itemsPerPage;
      const page = items.slice(start, end);
      return page;
    }
  }

  createEffect(() => setCurrentPage(getPage(currentIndexPage())));

  function nextPage() {
    setCurrentIndexPage(currentIndexPage() + 1);
  }

  function previousPage() {
    setCurrentIndexPage(currentIndexPage() - 1);
  }

  function goToHomepage() {
    setCurrentIndexPage(0);
  }

  function goToFinalPage() {
    setCurrentIndexPage(pages - 1);
  }

  return [
    currentPage,
    nextPage,
    previousPage,
    goToHomepage,
    goToFinalPage
  ]
}

export default usePagination;




















import { Accessor, createEffect, createSignal } from "solid-js";
import useIndex from "./useIndex"; // Certifique-se de que o caminho está correto

interface PaginationOptions {
  initialPage?: number;
  itemsPerPage?: number;
  totalItems: number;
  onPageChange?: (page: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
}

type PaginationReturn = [
  Accessor<number>,
  (page: number) => void,
  {
    hasNextPage: () => boolean,
    hasPreviousPage: () => boolean,
    nextPage: VoidFunction,
    previousPage: VoidFunction,
    firstPage: VoidFunction,
    lastPage: VoidFunction,
    resetPagination: VoidFunction,
    setItemsPerPage: (itemsPerPage: number) => void,
    totalPages: Accessor<number>,
    startItem: Accessor<number>,
    endItem: Accessor<number>,
    itemsPerPage: Accessor<number>,
    pageNumbers: Accessor<number[]>
  }
];

function usePagination({
  initialPage = 1,
  itemsPerPage = 10,
  totalItems,
  onPageChange,
  onItemsPerPageChange
}: PaginationOptions): PaginationReturn {
  const [itemsPerPageSignal, setItemsPerPageSignal] = createSignal(itemsPerPage);
  const totalPages = () => Math.ceil(totalItems / itemsPerPageSignal());

  const [currentPage, setCurrentPage, {
    hasNext: hasNextPage,
    hasPrevious: hasPreviousPage,
    next: nextPage,
    previous: previousPage,
    reset: resetPagination,
  }] = useIndex(totalPages(), {
    initialIndex: initialPage - 1,
    onIndexChange: (index) => onPageChange?.(index + 1)
  });

  const setPage = (page: number) => {
    if (page >= 1 && page <= totalPages()) {
      setCurrentPage(page - 1);
    }
  };

  const setItemsPerPage = (itemsPerPage: number) => {
    setItemsPerPageSignal(itemsPerPage);
    onItemsPerPageChange?.(itemsPerPage);
    resetPagination();
  };

  const firstPage = () => setPage(1);
  const lastPage = () => setPage(totalPages());

  const startItem = () => (currentPage() - 1) * itemsPerPageSignal() + 1;
  const endItem = () => Math.min(currentPage() * itemsPerPageSignal(), totalItems);

  const pageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages(); i++) {
      pages.push(i);
    }
    return pages;
  };

  return [
    () => currentPage() + 1,
    setPage,
    {
      hasNextPage,
      hasPreviousPage,
      nextPage,
      previousPage,
      firstPage,
      lastPage,
      resetPagination,
      setItemsPerPage,
      totalPages,
      startItem,
      endItem,
      itemsPerPage: itemsPerPageSignal,
      pageNumbers
    }
  ];
}

export default usePagination;
