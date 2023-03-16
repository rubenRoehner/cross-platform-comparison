import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Animated, Dimensions, Easing, StatusBar, View } from "react-native";
import Canvas, { CanvasRenderingContext2D } from "react-native-canvas";

const { width, height } = Dimensions.get('window');

const CustomPainter: React.FC = () => {
    const [canvasReference, setCanvas] = useState<Canvas | null>(null)
    const [canvasWidth, setCanvasWidth] = useState(0)
    var [canvasHeight, setCanvasHeight] = useState(0)

    const progress = useRef(new Animated.Value(0)).current;

    progress.addListener((value) => {
        animateProgressIndicator(value.value)
    })

    function clearCanvas(canvas: Canvas) {
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    }

    function toRadians(angle: number): number {
        return angle * Math.PI / 180
    }

    function animateProgressIndicator(animProgress: number) {
        if (canvasReference) {
            const context = canvasReference.getContext('2d');
            if (context) {
                console.log("draw: " + animProgress)
                clearCanvas(canvasReference)

                const width = canvasReference.width
                const height = canvasReference.height

                context.fillStyle = "#f1f1f1"
                context.fillRect(0, 0, width, height)

                drawAnimatedCircle(context, animProgress, width / 2, height / 2 - 50, 100, "blue")

                context.textAlign = "center"
                context.font = "normal normal bold 20px sans-serif"
                context.fillText("Loading...", width / 2, height / 2 + 90)
            }
        }
    }

    function drawAnimatedCircle(context: CanvasRenderingContext2D, animationProgress: number, x: number, y: number, radius: number, fillStyle?: CanvasRenderingContext2D["fillStyle"] | undefined) {
        context.beginPath()
        context.arc(x, y, radius, toRadians(90 - animationProgress * 1.8), toRadians(90 + animationProgress * 1.8), false)
        if (fillStyle) {
            context.fillStyle = fillStyle
            context.fill()
        }
    }

    useEffect(() => {
        setCanvasWidth(width)
        let statusbarHeight = StatusBar.currentHeight ?? 0
        setCanvasHeight(height - statusbarHeight)
        if (canvasReference) {
            canvasReference.width = width
            canvasReference.height = height
        }

        Animated.loop(
            Animated.timing(progress, {
                toValue: 100,
                duration: 5000,
                useNativeDriver: true,
                easing: Easing.linear
            })
        ).start()

        return () => {
            progress.removeAllListeners()
        }
    }, [])

    useLayoutEffect(() => {
        if (canvasReference) {
            canvasReference.width = width
            canvasReference.height = height
        }
    }, [canvasReference])

    return <View style={{ width: "100%", height: "100%" }}><Canvas style={{ width: canvasWidth, height: canvasHeight }} ref={(canvas: Canvas) => (setCanvas(canvas))} /></View>
};

export default CustomPainter;