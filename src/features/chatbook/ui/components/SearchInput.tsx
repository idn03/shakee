import { View, TextInput } from "react-native";
import { Search } from "lucide-react-native";

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ value, onChangeText }) => {
  return (
    <View className="h-10 flex-row items-center">
      <View className="absolute left-[12px] self-center">
        <Search
          size={18}
          color={"#FFFFFF"}
        />
      </View>
      <TextInput
        className="w-full border border-white h-10 rounded-[20px] bg-gray-500/20 px-4 text-white pl-10"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};
