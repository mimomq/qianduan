import React, { useState, useEffect } from 'react';

// 定义用户数据的接口
interface User {
  name: string;
  email: string;
}

// 定义组件的 props 接口
interface UserDataProps {
  userId: string;
}

const UserData: React.FC<UserDataProps> = ({ userId }) => {
  // 状态管理
  const [user, setUser] = useState<User | null>(null);
  const [seconds, setSeconds] = useState<number>(0);

  // 模拟 componentDidMount 和 componentDidUpdate
  useEffect(() => {
    // 获取用户数据的函数
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://secret.url/user/${userId}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    // 初次加载时获取数据
    fetchUserData();

    // 设置定时器
    const intervalId = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);

    // 清理定时器（模拟 componentWillUnmount）
    return () => clearInterval(intervalId);
  }, [userId]); // 依赖 userId，当它变化时重新获取数据

  return (
    <div>
      <h1>User Data Component</h1>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      <p>Timer: {seconds} seconds</p>
    </div>
  );
};

export default UserData;