import {
  forwardRef,
  useCallback,
  type ReactNode,
} from "react";
import { Pressable, Text, View } from "react-native";
import BottomSheet, {
  BottomSheetFooter,
  BottomSheetView,
  type BottomSheetFooterProps,
  type BottomSheetProps,
} from "@gorhom/bottom-sheet";
import { cssInterop } from "nativewind";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const NativeWindBottomSheet = cssInterop(BottomSheet, {
  className: "backgroundStyle",
  handleIndicatorClassName: "handleIndicatorStyle",
});

const NativeWindBottomSheetView = cssInterop(BottomSheetView, {
  className: "style",
});

export interface ShakeeBottomSheetFooterButton {
  /** Text displayed in the button. */
  label: string;
  onPress: () => void;
  disabled?: boolean;
  accessibilityLabel?: string;
  testID?: string;
}

export interface ShakeeBottomSheetProps
  extends Omit<BottomSheetProps, "children" | "footerComponent"> {
  /** Optional content displayed above the sheet body. */
  headerTitle?: ReactNode;
  /** Shows the sticky footer when a footer action or `footerContent` is supplied. */
  isFooterShow?: boolean;
  /** Primary footer action. */
  footerButtonConfirm?: ShakeeBottomSheetFooterButton;
  /** Optional secondary footer action. */
  footerButtonCancel?: ShakeeBottomSheetFooterButton;
  /** Replaces the built-in footer buttons with custom footer content. */
  footerContent?: ReactNode;
  children?: ReactNode;
}

export const ShakeeBottomSheet = forwardRef<
  BottomSheet,
  ShakeeBottomSheetProps
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
      ...bottomSheetProps
    },
    ref,
  ) => {
    const { bottom: bottomInset } = useSafeAreaInsets();

    const renderFooter = useCallback(
      (footerProps: BottomSheetFooterProps) => {
        if (!isFooterShow) return null;

        return (
          <BottomSheetFooter {...footerProps} bottomInset={bottomInset}>
            <View className="px-5 pt-3">
              {footerContent ?? (
                <View className="flex-row gap-3">
                  {footerButtonCancel ? (
                    <FooterButton
                      action={footerButtonCancel}
                      variant="secondary"
                    />
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
      <NativeWindBottomSheet
        ref={ref}
        className="rounded-3xl bg-neutral-900"
        handleIndicatorClassName="w-10 bg-neutral-500"
        backgroundStyle={backgroundStyle}
        handleIndicatorStyle={handleIndicatorStyle}
        footerComponent={isFooterShow ? renderFooter : undefined}
        {...bottomSheetProps}
      >
        <NativeWindBottomSheetView
          className="px-5 pb-6"
          enableFooterMarginAdjustment={isFooterShow}
        >
          {headerTitle ? (
            <Text className="mb-4 text-xl font-bold text-white">
              {headerTitle}
            </Text>
          ) : null}
          {children}
        </NativeWindBottomSheetView>
      </NativeWindBottomSheet>
    );
  },
);

ShakeeBottomSheet.displayName = "ShakeeBottomSheet";

interface FooterButtonProps {
  action: ShakeeBottomSheetFooterButton;
  variant: "primary" | "secondary";
}

function FooterButton({ action, variant }: FooterButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <Pressable
      accessibilityLabel={action.accessibilityLabel ?? action.label}
      accessibilityRole="button"
      accessibilityState={{ disabled: action.disabled }}
      disabled={action.disabled}
      onPress={action.onPress}
      className={`min-h-12 flex-1 items-center justify-center rounded-xl px-4 active:opacity-75 ${
        isPrimary ? "bg-white" : "border border-neutral-500"
      } ${action.disabled ? "opacity-50" : ""}`}
      testID={action.testID}
    >
      <Text className={`text-base font-bold ${isPrimary ? "text-black" : "text-white"}`}>
        {action.label}
      </Text>
    </Pressable>
  );
}
