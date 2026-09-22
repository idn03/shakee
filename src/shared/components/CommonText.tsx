import { Text } from "react-native";

interface CommonTextProps {
  value: string;
  sizeNumber?: number;
  color?: string;
  className?: string;
};

export const CommonText: React.FC<CommonTextProps> = ({value, sizeNumber, color = "#FFFFFF", className}) => {
  return (
    <Text
      className={`leading-[1.5] ${className ?? ""}`}
      style={{ color, ...(sizeNumber ? { fontSize: sizeNumber } : {}) }}
    >
      {value}
    </Text>
  );
};
