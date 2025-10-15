import React from 'react';

export default function Custom404() {
    return (
        <div style={{ textAlign: 'center', margin: '50px' }}>
            <h1>404 - Страница не найдена</h1>
            <p>К сожалению, запрашиваемая вами страница не была найдена.</p>
            <a href="/">Вернуться на главную</a>
        </div>
    );
}