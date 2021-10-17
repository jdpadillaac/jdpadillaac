part of '../home.dart';

class _VerticalLayout extends StatelessWidget {
  const _VerticalLayout({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Container(
      color: theme.colorScheme.surface,
      width: double.infinity,
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.xl,
        vertical: 50,
      ),
      child: Column(
        children: [
          Container(
            margin: const EdgeInsets.only(
              bottom: AppSpacing.sm,
            ),
            child: const _ImageContent(),
          ),
          const _NameInfo(),
        ],
      ),
    );
  }
}
