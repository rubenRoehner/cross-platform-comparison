import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_canvases/canvas_painter.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Canvases',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  double rotation = 0.0;
  late Timer timer;

  @override
  void initState() {
    super.initState();
    timer = Timer.periodic(
        const Duration(microseconds: 10),
        (Timer t) => setState(() {
              print("new rotation: $rotation");
            }));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text("Flutter canvases"),
        ),
        body: CustomPaint(
          painter: CanvasPainter(rotation),
          size: Size.infinite,
        ));
  }

  @override
  void dispose() {
    super.dispose();

    timer.cancel();
  }
}
