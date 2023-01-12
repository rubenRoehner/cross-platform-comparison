import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_io/screens/carts_screen.dart';
import 'package:flutter_io/screens/error_screen.dart';
import 'package:flutter_io/screens/products_screen.dart';
import 'package:flutter_io/screens/users_screen.dart';

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
        icon: Icon(CupertinoIcons.list_bullet), label: "Products"),
    BottomNavigationBarItem(
        icon: Icon(CupertinoIcons.person_3), label: "Users"),
    BottomNavigationBarItem(
        icon: Icon(CupertinoIcons.shopping_cart), label: "Carts"),
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
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text("Flutter IO-Operationen"),
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
        return const ProductsScreen();
      case 1:
        return const UsersScreen();
      case 2:
        return const CartsScreen();
      default:
        return const ErrorScreen();
    }
  }
}
