import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { QuantityStepper } from "./QuantityStepper";

describe("QuantityStepper", () => {
  it("renders the default value", () => {
    render(<QuantityStepper defaultValue={2} />);
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("increments and decrements when uncontrolled", () => {
    render(<QuantityStepper defaultValue={2} />);
    fireEvent.click(screen.getByRole("button", { name: /increase/i }));
    expect(screen.getByText("3")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /decrease/i }));
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("fires onChange with the new value", () => {
    const onChange = vi.fn();
    render(<QuantityStepper defaultValue={2} onChange={onChange} />);
    fireEvent.click(screen.getByRole("button", { name: /increase/i }));
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it("respects min bound and disables decrease", () => {
    render(<QuantityStepper defaultValue={1} min={1} />);
    const dec = screen.getByRole("button", { name: /decrease/i });
    expect(dec).toBeDisabled();
    fireEvent.click(dec);
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("respects max bound and disables increase", () => {
    render(<QuantityStepper defaultValue={5} max={5} />);
    const inc = screen.getByRole("button", { name: /increase/i });
    expect(inc).toBeDisabled();
  });

  it("does not update internal value when controlled", () => {
    const onChange = vi.fn();
    render(<QuantityStepper value={4} onChange={onChange} />);
    fireEvent.click(screen.getByRole("button", { name: /increase/i }));
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(onChange).toHaveBeenCalledWith(5);
  });

  it("disables both buttons when disabled", () => {
    render(<QuantityStepper defaultValue={2} disabled />);
    expect(screen.getByRole("button", { name: /increase/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /decrease/i })).toBeDisabled();
  });

  it("exposes an accessible group label", () => {
    render(<QuantityStepper defaultValue={1} aria-label="Item quantity" />);
    expect(screen.getByRole("group", { name: "Item quantity" })).toBeInTheDocument();
  });
});
