import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "~/shared/ui/button";

describe("Button", () => {
  it("renders an accessible native button", () => {
    render(<Button>Download</Button>);

    expect(screen.getByRole("button", { name: "Download" })).toBeInTheDocument();
  });

  it("supports the disabled state", () => {
    render(<Button disabled>Download</Button>);

    expect(screen.getByRole("button", { name: "Download" })).toBeDisabled();
  });
});
