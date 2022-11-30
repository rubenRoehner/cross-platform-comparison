import 'package:flutter/material.dart';

class CanvasPainter extends CustomPainter {
  final double rotation;

  CanvasPainter(this.rotation);

  @override
  void paint(Canvas canvas, Size size) {
    canvas.rotate(rotation);
    canvas.drawCircle(Offset(size.width / 2, size.height / 2), size.width / 2,
        Paint()..color = Colors.red);
    canvas.drawRect(
        const Rect.fromLTRB(10, 20, 50, 80), Paint()..color = Colors.green);
  }

  @override
  bool shouldRepaint(covariant CanvasPainter oldDelegate) {
    return rotation != oldDelegate.rotation;
  }
}
