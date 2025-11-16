export const BOARD_SIZE = 20;

export function getRandomPosition() {
    return [
        Math.floor(Math.random() * BOARD_SIZE),
        Math.floor(Math.random() * BOARD_SIZE)
    ];
}

export function moveSnake(snake, direction) {
    const head = [...snake[0]];

    switch (direction) {
        case 'UP':
            head[1] -= 1;
            break;
        case 'DOWN':
            head[1] += 1;
            break;
        case 'LEFT':
            head[0] -= 1;
            break;
        case 'RIGHT':
            head[0] += 1;
            break;
        default:
            break;
    }

    const newSnake = [head, ...snake.slice(0, snake.length - 1)];
    return newSnake;
}

export function checkFoodCollision(snake, food) {
    const [hx, hy] = snake[0];
    return hx === food[0] && hy === food[1];
}

export function checkSelfCollision(snake) {
    const [head, ...body] = snake;
    return body.some(segment => segment[0] === head[0] && segment[1] === head[1]);
}

export function checkWallCollision(snake) {
    const [x, y] = snake[0];
    return x < 0 || x >= BOARD_SIZE || y < 0 || y >= BOARD_SIZE;
}