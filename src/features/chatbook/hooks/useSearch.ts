import { useMemo, useState } from "react";
import type { ChatListItemProps } from "../ui/components/ChatListItem";

export const useSearch = (list: ChatListItemProps[]) => {
  const [query, setQuery] = useState("");

  const filteredList = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();

    if (!normalizedQuery) return list;

    return list.filter((item) =>
      item.username.toLocaleLowerCase().includes(normalizedQuery),
    );
  }, [list, query]);

  return { query, setQuery, filteredList };
};
