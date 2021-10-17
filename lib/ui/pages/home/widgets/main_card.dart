part of '../home.dart';

class _HomeMainCard extends StatelessWidget {
  const _HomeMainCard({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Container(
      color: theme.colorScheme.surface,
      width: double.infinity,
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.xl,
        vertical: 130,
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Expanded(
            flex: 1,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Jonatan Padilla ',
                  style: theme.textTheme.headline2!.copyWith(
                    color: theme.colorScheme.primary,
                  ),
                ),
                Text(
                  'Software developer',
                  style: theme.textTheme.headline3!.copyWith(
                    color: theme.colorScheme.secondary,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                const SizedBox(height: AppSpacing.md),
                Text(
                  'I am a software developer with 5 years of experience working and providing effective solutions for the growth of companies in the world through software with web and mobile technologies.',
                  style: theme.textTheme.bodyText1!.copyWith(
                    height: 1.4,
                    color: theme.colorScheme.onSurface,
                  ),
                ),
                const SizedBox(height: AppSpacing.md),
                Row(
                  children: const [
                    _CustomImage('assets/images/png/linkedin.png',
                        redirectUrl: 'https://www.linkedin.com/in/jdpadillac/'),
                    _CustomImage(
                      'assets/images/png/github.png',
                      redirectUrl: 'https://github.com/jdpadillaac',
                    ),
                    _CustomImage(
                      'assets/images/png/twitter.png',
                      redirectUrl: 'https://twitter.com/jdpadillac_',
                    ),
                  ],
                )
              ],
            ),
          ),
          const Expanded(flex: 1, child: SizedBox()),
        ],
      ),
    );
  }
}

class _CustomImage extends StatelessWidget {
  const _CustomImage(
    this.imagePath, {
    Key? key,
    required this.redirectUrl,
  }) : super(key: key);

  final String imagePath;
  final String redirectUrl;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: () {
          js.context.callMethod('open', [redirectUrl]);
        },
        child: Container(
          margin: const EdgeInsets.only(
            right: AppSpacing.sl,
          ),
          child: Image.asset(
            imagePath,
            width: 30,
            height: 30,
          ),
        ),
      ),
    );
  }
}
