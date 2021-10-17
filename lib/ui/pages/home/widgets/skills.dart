part of '../home.dart';

class _SkillWidget extends StatelessWidget {
  const _SkillWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (BuildContext context, _) {
        final width = MediaQuery.of(context).size.width;

        if (width < 800) {
          return Column(
            children: _SkillList.getSkillList(0),
          );
        } else {
          return Container(
            margin: const EdgeInsets.symmetric(
              vertical: AppSpacing.lg,
            ),
            width: double.infinity,
            child: Center(
              child: Expanded(
                child: SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: _SkillList.getSkillList(AppSpacing.sl),
                  ),
                ),
              ),
            ),
          );
        }
      },
    );
  }
}

class _SkillList {
  static List<Widget> getSkillList(double size) {
    return [
      Container(
        margin: EdgeInsets.symmetric(horizontal: size),
        child: Image.asset(
          AppAssets.flutter,
          color: AppColors.surface,
        ),
      ),
      Container(
        margin: EdgeInsets.symmetric(horizontal: size),
        child: Image.asset(
          AppAssets.swift,
          color: AppColors.surface,
        ),
      ),
      Container(
        margin: EdgeInsets.symmetric(horizontal: size),
        child: Image.asset(
          AppAssets.golang,
          color: AppColors.surface,
        ),
      ),
      Container(
        margin: EdgeInsets.symmetric(horizontal: size),
        child: Image.asset(
          AppAssets.angular,
          color: AppColors.surface,
        ),
      ),
      Container(
        margin: EdgeInsets.symmetric(horizontal: size),
        child: Image.asset(
          AppAssets.ts,
          color: AppColors.surface,
        ),
      ),
      Container(
        margin: EdgeInsets.symmetric(horizontal: size),
        child: Image.asset(
          AppAssets.nodejs,
          color: AppColors.surface,
        ),
      ),
      Container(
        margin: EdgeInsets.symmetric(horizontal: size),
        child: Image.asset(
          AppAssets.nest,
          color: AppColors.surface,
        ),
      ),
      Container(
        margin: EdgeInsets.symmetric(horizontal: size),
        child: Image.asset(
          AppAssets.docker,
          color: AppColors.surface,
        ),
      ),
      Container(
        margin: EdgeInsets.symmetric(horizontal: size),
        child: Image.asset(
          AppAssets.mysql,
          color: AppColors.surface,
        ),
      ),
      Container(
        margin: EdgeInsets.symmetric(horizontal: size),
        child: Image.asset(
          AppAssets.mongo,
          color: AppColors.surface,
        ),
      ),
    ];
  }
}
