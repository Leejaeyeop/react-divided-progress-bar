import type { Meta, StoryObj } from "@storybook/react";
import ProgressBar, { ProgressBarStyle } from "./index";

const ProgressBarColor = ProgressBarStyle.color.join("|");

const meta = {
  title: "Example/ProgressBar",
  component: ProgressBar,
  parameters: {
    layout: "full",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      // set percent 
      control: "number",
      table: {
        defaultValue: { summary: "0" },
      },
    },
    increaseDuration: {
      // set increase duration for percent
      control: "number",
      table: {
        defaultValue: { summary: "1000" },
      },
    },
    // set color
    color: {
      control: "multi-select",
      table: {
        type: {
          summary: ProgressBarColor,
        },
        defaultValue: { summary: "default" },
      },
      options: [
        "primary",
        "secondary",
        "info",
        "success",
        "warning",
        "danger",
        "black",
      ],
    },
    // set whether or not color change
    colorChange: {
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    // set ui divide bar option
    divide: {
      control: "boolean",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    // set maxvalue
    maxValue: {
      control: "number",
      table: {
        defaultValue: { summary: "100" },
      },
    },
    // set whether or not animated
    animated: {
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    // set whether or not stripped
    stripped: {
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
    },
  },
  args: {},
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (props) => {
    return <ProgressBar {...props} />;
  },
};

export const Primary: Story = {
  args: {
    color: "primary",
  },
};

export const Secondary: Story = {
  args: {
    color: "secondary",
  },
};

export const Info: Story = {
  args: {
    color: "info",
  },
};

export const Success: Story = {
  args: {
    color: "success",
  },
};

export const Warning: Story = {
  args: {
    color: "warning",
  },
};

export const Danger: Story = {
  args: {
    color: "danger",
  },
};

export const Black: Story = {
  args: {
    color: "black",
  },
};
