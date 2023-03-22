import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_persistence/ui/screens/error_screen.dart';
import 'package:flutter_persistence/ui/screens/todos_screen.dart';
import 'package:flutter_persistence/ui/screens/settings_screen.dart';
import 'package:intl/date_symbol_data_local.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(),
      debugShowCheckedModeBanner: false,
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});

  static const bottomNavigationItems = [
    BottomNavigationBarItem(
        icon: Icon(CupertinoIcons.list_bullet), label: "Todos"),
    BottomNavigationBarItem(
        icon: Icon(CupertinoIcons.settings), label: "Settings"),
  ];

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _selectedIndex = 0;

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  void initState() {
    super.initState();
    initializeDateFormatting();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text("Flutter Persistence"),
        ),
        body: SafeArea(child: _selectedScreen(_selectedIndex)),
        bottomNavigationBar: BottomNavigationBar(
          items: MyHomePage.bottomNavigationItems,
          currentIndex: _selectedIndex,
          onTap: _onItemTapped,
        ));
  }

  Widget _selectedScreen(int index) {
    switch (index) {
      case 0:
        return const TodosScreen();
      case 1:
        return const SettingsScreen();
      default:
        return const ErrorScreen();
    }
  }
}
