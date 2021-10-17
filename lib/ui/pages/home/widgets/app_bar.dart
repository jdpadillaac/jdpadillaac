import 'package:flutter/material.dart';
import 'package:jdpadillac/ui/constants/spacing.dart';

class HomeAppBar extends StatelessWidget {
  const HomeAppBar({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return MouseRegion(
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        child: Container(
          padding: const EdgeInsets.symmetric(
            horizontal: AppSpacing.md,
            vertical: AppSpacing.lg,
          ),
          color: theme.colorScheme.background,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Jonatan Padilla',
                style: Theme.of(context).textTheme.subtitle1,
              ),
              Container(
                padding: const EdgeInsets.symmetric(
                  horizontal: AppSpacing.xl,
                  vertical: AppSpacing.sm,
                ),
                decoration: BoxDecoration(
                  color: theme.colorScheme.primary,
                  borderRadius: BorderRadius.circular(AppSpacing.sm),
                ),
                child: Text(
                  'contact me',
                  style: theme.textTheme.bodyText1!.copyWith(
                    color: theme.colorScheme.background,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
