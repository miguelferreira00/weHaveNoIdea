import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';
import { Colors, FontSizes, Spacing, BorderRadius } from '../../styles/globalStyles';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    variant?: 'primary' | 'secondary' | 'danger' | 'outline';
    size?: 'small' | 'medium' | 'large';
}

export const Button = ({
    title,
    variant = 'primary',
    size = 'medium',
    style,
    ...props
}: ButtonProps) => {
    return (
        <TouchableOpacity
            style={[
                styles.base,
                styles[variant],
                styles[size],
                style
            ]}
            {...props}
        >
            <Text style={[styles.text, styles[`${variant}Text`], styles[`${size}Text`]]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    // Base
    base: {
        borderRadius: BorderRadius.medium,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.sm,
    },

    // Variantes
    primary: {
        backgroundColor: Colors.primary,
    },
    secondary: {
        backgroundColor: Colors.secondary,
    },
    danger: {
        backgroundColor: Colors.danger,
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: Colors.primary,
    },

    // Tamanhos
    small: {
        paddingVertical: Spacing.sm,
        paddingHorizontal: Spacing.md,
    },
    medium: {
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.lg,
    },
    large: {
        paddingVertical: Spacing.lg,
        paddingHorizontal: Spacing.xl,
    },

    // Textos
    text: {
        fontWeight: '600',
    },
    primaryText: {
        color: Colors.white,
    },
    secondaryText: {
        color: Colors.white,
    },
    dangerText: {
        color: Colors.white,
    },
    outlineText: {
        color: Colors.primary,
    },

    // Tamanhos de texto
    smallText: {
        fontSize: FontSizes.small,
    },
    mediumText: {
        fontSize: FontSizes.medium,
    },
    largeText: {
        fontSize: FontSizes.large,
    },
});
