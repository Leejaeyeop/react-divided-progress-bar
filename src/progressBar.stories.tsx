import type { Meta, StoryObj } from "@storybook/react";
import ProgressBar, { ProgressBarStyle } from "./index";

const ProgressBarColor = ProgressBarStyle.color.join("|");

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/ProgressBar",
  component: ProgressBar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "full",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    value: {
      control: "number",
      table: {
        defaultValue: { summary: "0" },
      },
    },
    increaseDuration: {
      control: "number",
      table: {
        defaultValue: { summary: "1000" },
      },
    },
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
    colorChange: {
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    divide: {
      control: "boolean",
      table: {
        defaultValue: { summary: "true" },
      },
    },
    maxValue: {
      control: "number",
      table: {
        defaultValue: { summary: "100" },
      },
    },
    animated: {
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    stripped: {
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
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
