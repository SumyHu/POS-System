package team.lingjing.dao;

import org.hibernate.FlushMode;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;
import org.hibernate.service.ServiceRegistryBuilder;

@SuppressWarnings("deprecation")
public class HibernateSessionFactory {
	//指定Hibernate配置文件路径
	private static String CONFIG_FILE_LOCATION = "/hibernate.cfg.xml";
	//创建ThreadLocal对象
	private static final ThreadLocal<Session> sessionThreadLocal = new ThreadLocal<Session>();
	//创建Configuration对象
	private static Configuration configuration = new Configuration();
	//定义SessionFactory对象
	private static SessionFactory sessionFactory;
	//定义configFile属性并赋值
	@SuppressWarnings("unused")
	private static String configFile = CONFIG_FILE_LOCATION;
	
	static {
		try{
			//读取配置文件hibernate.cfg.xml
			configuration.configure();
			//生成一个注册机对象
			@SuppressWarnings("deprecation")
			ServiceRegistry serviceRegistry = new ServiceRegistryBuilder().applySettings(configuration.getProperties()).buildServiceRegistry();
			//使用注册机对象serviceRegistry创建sessionFactory
			sessionFactory = configuration.buildSessionFactory(serviceRegistry);
		}catch(HibernateException e){
			e.printStackTrace();
		}
	
	}
	//创建无参的HibernateSessionFactory构造方法
	private HibernateSessionFactory(){
		
	}
	//重建SessionFactory
	public static void rebuildSessionFactory(){
		synchronized(sessionFactory){
			try{
				//读取配置文件hibernate.cfg.xml
				configuration.configure();
				//生成一个注册机对象
				@SuppressWarnings("deprecation")
				ServiceRegistry serviceRegistry = new ServiceRegistryBuilder().applySettings(configuration.getProperties()).buildServiceRegistry();
				//使用注册机对象serviceRegistry创建sessionFactory
				sessionFactory = configuration.buildSessionFactory(serviceRegistry);
			}catch(HibernateException e){
				e.printStackTrace();
			}
		}
	}
	//获得Session对象
	public static Session getSession(){
		//获得ThreadLocal对象管理的Session对象
		Session session = (Session)sessionThreadLocal.get();
		//session.setFlushMode(FlushMode.COMMIT);
		try{
			//判断Session对象是否已经存在或是否打开
			if(session == null || !session.isOpen()){
				//如果session对象为空或未打开，再判断sessionFactory对象是否为空
				if(sessionFactory == null){
					//如果sessionFactory为空，则创建SessionFactory
					rebuildSessionFactory();
				}
				//如果sessionFactory不为空，则打开Session
				session = (sessionFactory !=null)?sessionFactory.openSession():null;
				sessionThreadLocal.set(session);
			}
		}catch(HibernateException e){
			e.printStackTrace();
		}
		return session;
	}
	@SuppressWarnings("rawtypes")
	public static final ThreadLocal session = new ThreadLocal();

	@SuppressWarnings("unchecked")
	public static Session getCurrentSession()
	{
	Session s = (Session) session.get();
	// Open a new Session, if this Thread has none yet
	if (s == null)
	{
	s = sessionFactory.openSession();
	session.set(s);
	}
	s.setFlushMode(FlushMode.ALWAYS);
	return s;
	}

	//关闭Session对象
	public static void closeSession(){
		Session session = (Session)sessionThreadLocal.get();
		sessionThreadLocal.set(null);
		try{
			if(session!=null && session.isOpen()){
				session.close();
			}
		}catch(HibernateException e){
			e.printStackTrace();
	}
	}
	//configFile属性的set方法
	public static void setConfigFile(String configFile){
		HibernateSessionFactory.configFile = configFile;
		sessionFactory = null;
	}
	//configuration属性的get方法
	public static Configuration getConfiguration(){
		return configuration;
	}

}
