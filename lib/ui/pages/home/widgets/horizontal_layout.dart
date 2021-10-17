part of '../home.dart';

class _HorizontalLayout extends StatelessWidget {
  const _HorizontalLayout({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Container(
      color: theme.colorScheme.surface,
      width: double.infinity,
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.xl,
        vertical: 80,
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: const [
          Expanded(
            flex: 1,
            child: _NameInfo(),
          ),
          Expanded(
            flex: 1,
            child: _ImageContent(),
          ),
        ],
      ),
    );
  }
}
