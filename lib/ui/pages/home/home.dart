import 'package:flutter/material.dart';
import 'package:jdpadillac/ui/constants/spacing.dart';
import 'package:jdpadillac/ui/pages/home/widgets/app_bar.dart';
import 'dart:js' as js;

part 'widgets/main_card.dart';

class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final ThemeData theme = Theme.of(context);
    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          children: const [
            HomeAppBar(),
            _HomeMainCard(),
          ],
        ),
      ),
    );
  }
}
