import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Reveal } from "~/shared/ui/reveal";

describe("Reveal", () => {
  it("renders content without JavaScript-driven observation", () => {
    render(
      <Reveal>
        <p>Visible content</p>
      </Reveal>,
    );

    expect(screen.getByText("Visible content")).toBeVisible();
  });
});
