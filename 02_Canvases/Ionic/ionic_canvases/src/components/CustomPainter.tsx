import { useEffect, useRef } from "react";

const CustomPainter: React.FC = () => {
    const canvasReference = useRef<HTMLCanvasElement>(null);

    function clearCanvas(context: CanvasRenderingContext2D) {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)
    }

    function drawCircle(context: CanvasRenderingContext2D, x: number, y: number, radius: number, fillStyle?: CanvasFillStrokeStyles["fillStyle"] | undefined, strokeStyle?: CanvasFillStrokeStyles["strokeStyle"] | undefined, strokeWidth?: number | undefined) {
        context.beginPath()
        context.arc(x, y, radius, 0, 2 * Math.PI, false)
        if (fillStyle) {
            context.fillStyle = fillStyle
            context.fill()
        }
        if (strokeStyle) {
            context.strokeStyle = strokeStyle
            if (strokeWidth) {
                context.lineWidth = strokeWidth
            }
            context.stroke()
        }
    }

    useEffect(() => {
        if (canvasReference.current) {
            const canvasContext = canvasReference.current.getContext('2d');
            if (canvasContext) {
                const canvas = canvasContext.canvas
                canvas.style.width = "100%"
                canvas.style.height = "100%"
                canvas.width = canvas.offsetWidth
                canvas.height = canvas.offsetHeight
                const width = canvas.width
                const height = canvas.height

                clearCanvas(canvasContext)

                drawCircle(canvasContext, width / 2, height / 2, (width / 2) - 20, "red")
                canvasContext.fillStyle = 'green'
                canvasContext.fillRect(10, 20, 50, 80)
            }
        }

    })

    return <canvas ref={canvasReference} />
};

export default CustomPainter;
