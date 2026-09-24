import { forwardRef, useCallback, type ReactNode } from "react";
import { Pressable, Text, View } from "react-native";
import {
  BottomSheetFooter,
  BottomSheetModal,
  BottomSheetView,
  type BottomSheetFooterProps,
  type BottomSheetModalProps,
} from "@gorhom/bottom-sheet";
import { cssInterop } from "nativewind";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const NativeWindBottomSheetModal = cssInterop(BottomSheetModal, {
  className: "backgroundStyle",
  handleIndicatorClassName: "handleIndicatorStyle",
});

const NativeWindBottomSheetView = cssInterop(BottomSheetView, {
  className: "style",
});

export interface ShakeeBottomSheetModalFooterButton {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  accessibilityLabel?: string;
  testID?: string;
}

export interface ShakeeBottomSheetModalProps
  extends Omit<BottomSheetModalProps, "children" | "footerComponent"> {
  headerTitle?: ReactNode;
  isFooterShow?: boolean;
  footerButtonConfirm?: ShakeeBottomSheetModalFooterButton;
  footerButtonCancel?: ShakeeBottomSheetModalFooterButton;
  footerContent?: ReactNode;
  children?: ReactNode;
}

export const ShakeeBottomSheetModal = forwardRef<
  BottomSheetModal<unknown>,
  ShakeeBottomSheetModalProps
>(
  (
    {
      headerTitle,
      isFooterShow = false,
      footerButtonConfirm,
      footerButtonCancel,
      footerContent,
      children,
      backgroundStyle,
      handleIndicatorStyle,
      ...bottomSheetModalProps
    },
    ref,
  ) => {
    const { bottom: bottomInset } = useSafeAreaInsets();

    const renderFooter = useCallback(
      (footerProps: BottomSheetFooterProps) => {
        if (!isFooterShow) return null;

        return (
          <BottomSheetFooter {...footerProps} bottomInset={bottomInset}>
            <View className="border-t border-neutral-700 bg-neutral-900 px-5 pt-3">
              {footerContent ?? (
                <View className="flex-row gap-3">
                  {footerButtonCancel ? (
                    <FooterButton action={footerButtonCancel} variant="secondary" />
                  ) : null}
                  {footerButtonConfirm ? (
                    <FooterButton action={footerButtonConfirm} variant="primary" />
                  ) : null}
                </View>
              )}
            </View>
          </BottomSheetFooter>
        );
      },
      [
        bottomInset,
        footerButtonCancel,
        footerButtonConfirm,
        footerContent,
        isFooterShow,
      ],
    );

    return (
      <NativeWindBottomSheetModal
        ref={ref}
        className="rounded-3xl bg-neutral-900"
        handleIndicatorClassName="w-10 bg-neutral-500"
        backgroundStyle={backgroundStyle}
        handleIndicatorStyle={handleIndicatorStyle}
        footerComponent={isFooterShow ? renderFooter : undefined}
        {...bottomSheetModalProps}
      >
        <NativeWindBottomSheetView
          className="px-5 pb-6"
          enableFooterMarginAdjustment={isFooterShow}
        >
          {headerTitle ? (
            <Text className="mb-4 text-xl font-bold text-white">{headerTitle}</Text>
          ) : null}
          {children}
        </NativeWindBottomSheetView>
      </NativeWindBottomSheetModal>
    );
  },
);

ShakeeBottomSheetModal.displayName = "ShakeeBottomSheetModal";

interface FooterButtonProps {
  action: ShakeeBottomSheetModalFooterButton;
  variant: "primary" | "secondary";
}

function FooterButton({ action, variant }: FooterButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <Pressable
      accessibilityLabel={action.accessibilityLabel ?? action.label}
      accessibilityRole="button"
      accessibilityState={{ disabled: action.disabled }}
      className={`min-h-12 flex-1 items-center justify-center rounded-xl px-4 active:opacity-75 ${
        isPrimary ? "bg-white" : "border border-neutral-500"
      } ${action.disabled ? "opacity-50" : ""}`}
      disabled={action.disabled}
      onPress={action.onPress}
      testID={action.testID}
    >
      <Text className={`text-base font-bold ${isPrimary ? "text-black" : "text-white"}`}>
        {action.label}
      </Text>
    </Pressable>
  );
}
