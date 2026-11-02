import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { FaqAccordion } from "~/shared/ui/faq-accordion";

const items = [
  { value: "one", question: "What is SFA?", answer: "A smart irrigation platform." },
  {
    value: "two",
    question: "Is it accessible?",
    answer: "Yes, keyboard and screen-reader friendly.",
  },
];

describe("FaqAccordion", () => {
  it("keeps answers in the DOM and opens the native disclosure", async () => {
    const user = userEvent.setup();
    render(<FaqAccordion items={items} />);

    const summary = screen.getByText("What is SFA?").closest("summary");
    const details = summary?.closest("details");

    expect(summary).toBeInTheDocument();
    expect(details).not.toHaveAttribute("open");
    expect(screen.getByText("A smart irrigation platform.")).toBeInTheDocument();

    await user.click(summary as HTMLElement);

    expect(details).toHaveAttribute("open");
    expect(screen.getByText("A smart irrigation platform.")).toBeVisible();
  });
});
