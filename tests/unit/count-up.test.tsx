import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CountUp } from "~/shared/motion/count-up";

describe("CountUp", () => {
  it("renders the final value on first render", () => {
    render(<CountUp value={246} locale="en" />);

    expect(screen.getByText("246")).toBeInTheDocument();
  });

  it("renders the provided localized display text", () => {
    render(<CountUp value={2000} display="۲٬۰۰۰" locale="fa" />);

    expect(screen.getByText("۲٬۰۰۰")).toBeInTheDocument();
  });
});
