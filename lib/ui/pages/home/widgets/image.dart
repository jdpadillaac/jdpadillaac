part of '../home.dart';

class _ImageContent extends StatelessWidget {
  const _ImageContent({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final borderRadius = BorderRadius.circular(200);

    return Center(
      child: Container(
        decoration: BoxDecoration(
          borderRadius: borderRadius,
          border: Border.all(
            width: 3,
            color: theme.colorScheme.secondary,
          ),
        ),
        child: ClipRRect(
          borderRadius: borderRadius,
          child: Image.asset(
            'assets/images/jpg/profile.jpg',
            height: 300,
            width: 300,
            fit: BoxFit.cover,
          ),
        ),
      ),
    );
  }
}
