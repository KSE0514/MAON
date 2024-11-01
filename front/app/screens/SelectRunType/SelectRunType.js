import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import { useFontsLoaded } from "../../utils/fontContext";
import { ButtonList, Wrapper } from "./SelectRunTypeStyle";
import GradientButton from "../../components/Button/GradientsBtn/GradientsButton";

const SelectRunType = () => {
  const buttons = [
    {
      onPress: () => {
        alert("hello");
      },
      title: `지정코스로\n달리기`,
      gradientType: "orange_gradient",
      mode: "selectedRoute",
    },
    {
      onPress: () => {
        alert("hello");
      },
      title: `지정코스없이\n달리기`,
      gradientType: "mandarin_gradient",
      mode: "notSelectedRoute",
    },
    {
      onPress: () => {
        alert("hello");
      },
      title: `고스트\n모드`,
      gradientType: "grape_fruit_gradient",
      mode: "ghost",
    },
  ];
  return (
    <Wrapper>
      <ButtonList>
        {buttons.map((button) => (
          <GradientButton
            key={button.text} // 각 컴포넌트에 고유한 key 추가
            onPress={button.onPress}
            title={button.title}
            gradientType={button.gradientType}
            mode={button.mode}
          />
        ))}
      </ButtonList>
    </Wrapper>
  );
};
export default SelectRunType;
