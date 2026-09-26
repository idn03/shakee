import { Text } from "react-native";

interface CommonTextProps {
  value: string;
  sizeNumber?: number;
  color?: string;
  className?: string;
  numberOfLines?: number;
};

export const CommonText: React.FC<CommonTextProps> = ({
  value,
  sizeNumber,
  color = "#FFFFFF",
  className,
  numberOfLines,
}) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      ellipsizeMode={numberOfLines ? "tail" : undefined}
      className={`leading-[1.5] ${className ?? ""}`}
      style={{ color, ...(sizeNumber ? { fontSize: sizeNumber } : {}) }}
    >
      {value}
    </Text>
  );
};
