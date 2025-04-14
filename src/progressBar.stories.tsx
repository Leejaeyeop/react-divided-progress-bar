import type { Meta, StoryObj } from "@storybook/react";
import ProgressBar, { ProgressBarStyle } from "./index";
import React from "react";

// 타입 정의
type ColorOption = (typeof ProgressBarStyle.color)[number];
const colorOptions: ColorOption[] = [...ProgressBarStyle.color];

const meta = {
  title: "Components/ProgressBar",
  component: ProgressBar,
  parameters: {
    layout: "full",
    docs: {
      description: {
        component: "시각적 진행 상태를 표시하는 프로그래스 바 컴포넌트. 다양한 색상, 애니메이션 효과, 구분선 옵션을 지원합니다.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      description: "현재 진행 값 (0 ~ maxValue 사이의 값)",
      control: {
        type: "range",
        min: 0,
        max: 100,
        step: 1,
      },
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "0" },
      },
    },
    maxValue: {
      description: "진행률 계산을 위한 최대 값",
      control: {
        type: "number",
        min: 1,
      },
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "100" },
      },
    },
    increaseDuration: {
      description: "진행 애니메이션 지속 시간(밀리초)",
      control: {
        type: "number",
        min: 0,
        step: 100,
      },
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "1000" },
      },
    },
    color: {
      description: "프로그래스 바의 색상 테마",
      control: "select",
      options: colorOptions,
      table: {
        type: { summary: colorOptions.join(" | ") },
        defaultValue: { summary: "primary" },
      },
    },
    colorChange: {
      description: "진행률에 따라 색상이 점진적으로 변경되는지 여부",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    divide: {
      description: "구분선 표시 여부",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    sections: {
      description: "구분선 개수 (divide가 true일 때만 적용)",
      control: {
        type: "number",
        min: 1,
        max: 10,
      },
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "2" },
      },
    },
    animated: {
      description: "애니메이션 효과 적용 여부",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    stripped: {
      description: "줄무늬 패턴 적용 여부 (animated와 함께 사용 권장)",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
  },
  args: {
    value: 30,
    maxValue: 100,
    increaseDuration: 1000,
    color: "primary",
    colorChange: false,
    divide: true,
    sections: 2,
    animated: false,
    stripped: false,
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 프로그래스 바. 기본값으로 렌더링됩니다.
 */
export const Default: Story = {};

/**
 * 모든 색상 변형을 한 번에 보여줍니다.
 */
export const AllColors: Story = {
  argTypes: {
    color: { table: { disable: true } },
    value: { table: { disable: true } },
  },
  render: args => (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "center" }}>
      {colorOptions.map(color => (
        <div key={color}>
          <h4 style={{ marginBottom: "8px", textTransform: "capitalize" }}>{color}</h4>
          <ProgressBar style={{ width: "400px" }} {...args} color={color} value={Math.floor(Math.random() * 100)} />
        </div>
      ))}
    </div>
  ),
};

/**
 * 색상이 진행률에 따라 점진적으로 변경되는 예시
 */
export const GradientColor: Story = {
  args: {
    colorChange: true,
    value: 75,
  },
  name: "With Gradient Color",
};

/**
 * 애니메이션과 줄무늬 효과가 적용된 예시
 */
export const AnimatedStriped: Story = {
  args: {
    animated: true,
    stripped: true,
    value: 65,
  },
  name: "Animated & Striped",
};

/**
 * 구분선이 없는 간단한 버전
 */
export const NoDividers: Story = {
  args: {
    divide: false,
    sections: 1,
  },
  name: "Without Dividers",
};

/**
 * 사용자 정의 구분선 개수 (5개) 예시
 */
export const CustomSections: Story = {
  args: {
    sections: 5,
    value: 50,
  },
  name: "With 5 Sections",
};

/**
 * 최대값을 200으로 설정한 예시
 */
export const CustomMaxValue: Story = {
  args: {
    maxValue: 200,
    value: 150,
  },
  name: "Custom Max Value (200)",
};
