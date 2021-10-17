import 'package:flutter/material.dart';
import 'package:jdpadillac/ui/constants/assets.dart';
import 'package:jdpadillac/ui/constants/colors.dart';
import 'package:jdpadillac/ui/constants/spacing.dart';
import 'package:jdpadillac/ui/pages/home/widgets/app_bar.dart';
import 'package:url_launcher/url_launcher.dart';

part 'widgets/main_card.dart';
part 'widgets/horizontal_layout.dart';
part 'widgets/vertical_layout.dart';
part 'widgets/image.dart';
part 'widgets/skills.dart';

class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          children: const [
            HomeAppBar(),
            _HomeMainCard(),
            _SkillWidget(),
          ],
        ),
      ),
    );
  }
}
