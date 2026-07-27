import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ProgressBar } from "./ProgressBar";

describe("ProgressBar", () => {
  it("renders a progressbar with the correct value", () => {
    render(<ProgressBar value={42} />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "42");
    expect(bar).toHaveAttribute("aria-valuemin", "0");
    expect(bar).toHaveAttribute("aria-valuemax", "100");
  });

  it("shows the rounded percentage in the header", () => {
    render(<ProgressBar value={66.6} />);
    expect(screen.getByText("67%")).toBeInTheDocument();
  });

  it("uses the default status label for 0", () => {
    render(<ProgressBar value={0} />);
    expect(screen.getByText("Not started")).toBeInTheDocument();
  });

  it("uses the default status label for 100", () => {
    render(<ProgressBar value={100} />);
    expect(screen.getByText("Complete")).toBeInTheDocument();
  });

  it("renders a custom label when provided", () => {
    render(<ProgressBar value={50} label="Uploading" />);
    expect(screen.getByText("Uploading")).toBeInTheDocument();
  });

  it("clamps values above 100 and below 0", () => {
    const { rerender } = render(<ProgressBar value={150} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "100");
    rerender(<ProgressBar value={-20} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "0");
  });

  it("hides the header when hideHeader is set", () => {
    render(<ProgressBar value={40} hideHeader />);
    expect(screen.queryByText("40%")).not.toBeInTheDocument();
  });
});
