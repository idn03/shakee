import {
  forwardRef,
  useCallback,
  type ReactNode,
} from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import BottomSheet, {
  BottomSheetFooter,
  BottomSheetView,
  type BottomSheetFooterProps,
  type BottomSheetProps,
} from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
            <View style={styles.footer}>
              {footerContent ?? (
                <View style={styles.footerActions}>
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
      <BottomSheet
        ref={ref}
        backgroundStyle={[styles.background, backgroundStyle]}
        handleIndicatorStyle={[styles.handleIndicator, handleIndicatorStyle]}
        footerComponent={isFooterShow ? renderFooter : undefined}
        {...bottomSheetProps}
      >
        <BottomSheetView style={styles.content}>
          {headerTitle ? <Text style={styles.headerTitle}>{headerTitle}</Text> : null}
          {children}
        </BottomSheetView>
      </BottomSheet>
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
      style={({ pressed }) => [
        styles.footerButton,
        isPrimary ? styles.primaryButton : styles.secondaryButton,
        action.disabled ? styles.disabledButton : null,
        pressed && !action.disabled ? styles.pressedButton : null,
      ]}
      testID={action.testID}
    >
      <Text style={isPrimary ? styles.primaryButtonText : styles.secondaryButtonText}>
        {action.label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#171717",
    borderRadius: 24,
  },
  handleIndicator: {
    backgroundColor: "#737373",
    width: 40,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
  },
  footer: {
    backgroundColor: "#171717",
    borderTopColor: "#404040",
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  footerActions: {
    flexDirection: "row",
    gap: 12,
  },
  footerButton: {
    alignItems: "center",
    borderRadius: 12,
    flex: 1,
    minHeight: 48,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  primaryButton: {
    backgroundColor: "#FFFFFF",
  },
  secondaryButton: {
    borderColor: "#737373",
    borderWidth: 1,
  },
  primaryButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "700",
  },
  secondaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  disabledButton: {
    opacity: 0.45,
  },
  pressedButton: {
    opacity: 0.75,
  },
});
