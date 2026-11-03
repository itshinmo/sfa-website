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
  it("keeps answers in the DOM and toggles through the Base UI trigger", async () => {
    const user = userEvent.setup();
    render(<FaqAccordion items={items} />);

    const trigger = screen.getByRole("button", { name: "What is SFA?" });
    const answer = screen.getByText("A smart irrigation platform.");

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(answer).toBeInTheDocument();

    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(answer).toBeVisible();
  });
});
