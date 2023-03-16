import 'package:flutter/material.dart';
import 'dart:math';

class CanvasPainter extends CustomPainter {
  final double progress;

  CanvasPainter(this.progress);

  double toRadians(double angle) => angle * pi / 180.0;

  @override
  void paint(Canvas canvas, Size size) {
    double width = size.width;
    double height = size.height;

    Paint paint = Paint()..color = Colors.blue;

    canvas.drawArc(
      Rect.fromCircle(center: Offset(width / 2, height / 2 - 20), radius: 100),
      toRadians(90 + progress * 180),
      toRadians(-progress * 360),
      false,
      paint,
    );

    final textPainter = TextPainter(
        text: const TextSpan(
          text: "Loading...",
          style: TextStyle(
            color: Colors.blue,
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
        ),
        textDirection: TextDirection.ltr,
        textAlign: TextAlign.center);
    textPainter.layout(minWidth: width);
    textPainter.paint(canvas, Offset(0, height / 2 + 120));
  }

  @override
  bool shouldRepaint(covariant CanvasPainter oldDelegate) {
    return oldDelegate.progress != progress;
  }
}
