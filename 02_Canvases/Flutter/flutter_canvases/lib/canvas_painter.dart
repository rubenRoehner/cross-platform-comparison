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
      Rect.fromCircle(center: Offset(width / 2, height / 2), radius: 100),
      toRadians(90 + progress * 1.8),
      toRadians(-progress * 3.6),
      false,
      paint,
    );
  }

  @override
  bool shouldRepaint(covariant CanvasPainter oldDelegate) {
    return oldDelegate.progress != progress;
  }
}
