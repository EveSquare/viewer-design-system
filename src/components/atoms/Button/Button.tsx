import React, { memo } from "react";
import { AppButton } from "@/components/atoms/Button/module.style";
import { Props } from "./type";
import { useColorModeValue } from "@chakra-ui/react";

export const Button: React.FC<Props> = memo(
  ({ type, size, label, ...props }) => {
    // ボタンタイプによる色とスタイルの決定
    let backgroundColor = "primary";
    let color = "white";
    const primayColor = useColorModeValue("white", "black");
    switch (type) {
      case "primary":
        backgroundColor = "primary";
        color = primayColor;
        break;
      case "secondary":
        backgroundColor = "white";
        color = "primary";
        break;
    }

    return (
      <AppButton
        fontSize={size === "small" ? "lg" : "2xl"}
        p="12px 24px"
        buttonsize={size}
        backgroundColor={backgroundColor}
        color={color}
        {...props}
      >
        {label}
      </AppButton>
    );
  }
);

Button.displayName = "Button";
