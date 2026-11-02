import type faBlog from "../fa/blog";

const blog = {
  meta: {
    title: "SFA Blog",
    description:
      "Research notes, field guides, and stories about water, soil, and smart farming.",
  },
  title: "Blog",
  subtitle:
    "Research notes, field guides, and stories about water, soil, and smart farming.",
  searchLabel: "Search the blog",
  searchPlaceholder: "Search by title, topic, or keyword",
  searchSubmit: "Search",
  clearSearch: "Clear search",
  tags: "Topics",
  allTags: "All",
  empty: "No articles have been published yet.",
  noResults: "No article matched your search.",
  resultsCount: "{{formattedCount}} articles",
  resultsCount_one: "{{formattedCount}} article",
  resultsCount_other: "{{formattedCount}} articles",
  resultsFor: "{{formattedCount}} results for “{{query}}”",
  resultsFor_one: "{{formattedCount}} result for “{{query}}”",
  resultsFor_other: "{{formattedCount}} results for “{{query}}”",
  searchChip: "Search: {{query}}",
  tagFilter: "Topic: {{tag}}",
  clearFilters: "Clear filters",
  readingTime: "{{minutes}} min read",
  related: "Related reading",
  toc: "On this page",
  breadcrumb: "Breadcrumb",
  previous: "Previous",
  next: "Next",
  pagination: "Pagination",
  page: "Page {{page}} of {{total}}",
  fallbackNotice:
    "This article is not available in English yet. You are reading the Persian version.",
  by: "By {{name}}",
  management: "Management",
  challenge: "Challenge",
  solution: "Solution",
  results: "Results",
  published: "Published",
  updated: "Updated",
  loading: "Loading articles",
  error: "We could not load the articles. Please try again.",
  errorTitle: "The blog is unavailable",
  retry: "Try again",
};

export default blog satisfies typeof faBlog;
