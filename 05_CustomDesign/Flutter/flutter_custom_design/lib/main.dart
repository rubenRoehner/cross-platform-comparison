import 'package:email_validator/email_validator.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Custom Design',
      debugShowCheckedModeBanner: false,
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
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            _getStyledButton(),
            _getStyledImage(),
            _getStyledTextInput()
          ],
        ),
      ),
    );
  }

  Widget _getStyledButton() {
    return ElevatedButton(
      onPressed: () {},
      style: ButtonStyle(
        shape: MaterialStatePropertyAll(
          RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
        ),
        textStyle: const MaterialStatePropertyAll(
          TextStyle(
            fontSize: 18,
            color: Colors.white,
            backgroundColor: Colors.transparent,
            fontFamily: 'Montserrat',
            fontWeight: FontWeight.w500,
          ),
        ),
        padding: const MaterialStatePropertyAll(EdgeInsets.all(0)),
      ),
      child: Container(
        constraints: const BoxConstraints(minHeight: 56, minWidth: 180),
        decoration: BoxDecoration(
          border: Border.all(color: const Color(0xFF4286f4), width: 2),
          borderRadius: BorderRadius.circular(8),
          gradient: LinearGradient(
            colors: List.of([const Color(0xFF373B44), const Color(0xFF4286f4)]),
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.center,
          children: const [Text("Styled Button")],
        ),
      ),
    );
  }

  Widget _getStyledImage() {
    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFFFAFAFA),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: const Color(0xffb3b3b3), width: 2),
        boxShadow: List.of([
          BoxShadow(
            color: Colors.black.withAlpha(127),
          )
        ]),
      ),
      padding: const EdgeInsets.all(8),
      child: const ColorFiltered(
        colorFilter: ColorFilter.mode(Color(0xAB000000), BlendMode.overlay),
        child: Image(
          image: AssetImage('assets/RWU_Logo.png'),
          width: 300,
          height: 300,
        ),
      ),
    );
  }

  Widget _getStyledTextInput() {
    return TextFormField(
      decoration: InputDecoration(
          border: OutlineInputBorder(
            borderSide: const BorderSide(color: Color(0xFFB3B3B3), width: 2),
            borderRadius: BorderRadius.circular(6),
          ),
          focusedBorder: OutlineInputBorder(
            borderSide: const BorderSide(color: Color(0xFF4286f4), width: 2),
            borderRadius: BorderRadius.circular(6),
          ),
          errorBorder: OutlineInputBorder(
            borderSide: const BorderSide(color: Color(0xFFff3a30), width: 2),
            borderRadius: BorderRadius.circular(6),
          ),
          hintText: "Placeholder",
          hintStyle: const TextStyle(
            fontSize: 16,
            fontFamily: 'Montserrat',
            fontWeight: FontWeight.w300,
            color: Color(0xFFB3B3B3),
          ),
          contentPadding:
              const EdgeInsets.symmetric(horizontal: 16, vertical: 12)),
      autovalidateMode: AutovalidateMode.always,
      validator: (value) {
        return EmailValidator.validate(value!) ? null : "Error: invalid input";
      },
      style: const TextStyle(
        fontSize: 16,
        fontFamily: 'Montserrat',
        fontWeight: FontWeight.w500,
        color: Color(0xFF383838),
      ),
    );
  }
}
