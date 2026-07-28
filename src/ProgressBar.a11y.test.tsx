import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { describe, it, expect } from "vitest";
import { ProgressBar } from "./ProgressBar";

expect.extend(toHaveNoViolations);

describe("ProgressBar accessibility", () => {
  it("has no violations — in progress", async () => {
    const { container } = render(<ProgressBar value={33} />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — complete", async () => {
    const { container } = render(<ProgressBar value={100} />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — header hidden", async () => {
    const { container } = render(
      <ProgressBar value={50} hideHeader aria-label="Upload progress" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
