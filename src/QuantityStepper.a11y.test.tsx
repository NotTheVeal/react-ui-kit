import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { describe, it, expect } from "vitest";
import { QuantityStepper } from "./QuantityStepper";

expect.extend(toHaveNoViolations);

describe("QuantityStepper accessibility", () => {
  it("has no violations — future", async () => {
    const { container } = render(<QuantityStepper defaultValue={2} />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — current", async () => {
    const { container } = render(
      <QuantityStepper defaultValue={2} colorScheme="current" />
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no violations — disabled", async () => {
    const { container } = render(<QuantityStepper defaultValue={2} disabled />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
