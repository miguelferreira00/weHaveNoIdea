import React from 'react';
import { View, Text, StyleSheet, ViewProps } from 'react-native';
import { Colors, Spacing, BorderRadius } from '../../styles/globalStyles';

interface CardProps extends ViewProps {
    title?: string;
    children: React.ReactNode;
    variant?: 'default' | 'primary' | 'secondary';
}

export const Card = ({ title, children, variant = 'default', style, ...props }: CardProps) => {
    return (
        <View style={[styles.card, styles[variant], style]} {...props}>
            {title && <Text style={styles.title}>{title}</Text>}
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.white,
        padding: Spacing.md,
        borderRadius: BorderRadius.large,
        marginBottom: Spacing.md,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    default: {
        borderLeftWidth: 0,
    },
    primary: {
        borderLeftWidth: 4,
        borderLeftColor: Colors.primary,
    },
    secondary: {
        borderLeftWidth: 4,
        borderLeftColor: Colors.secondary,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.dark,
        marginBottom: Spacing.sm,
    },
});
