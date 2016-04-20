import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpSession;
import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;

import org.json.JSONException;
import org.json.JSONObject;

@ServerEndpoint(value = "/chat")//, configurator=ServletAwareConfig.class) //클라이언트가 접속할 때 사용될 URI
public class WebSocketController {

    private static Map<String, Session> sessionMap = new HashMap<>();
 
    private HttpSession httpSession;
    private Session ss;
 
    int a = 0;
    @OnOpen
    public void start(Session session, EndpointConfig config) {
    	try{
    		ss = session;
	    	httpSession = (HttpSession) config.getUserProperties().get(HttpSession.class.getName());
	    	String userId = ss.getId();//(String)httpSession.getAttribute("id");
    		String id = ss.getRequestParameterMap().get("name").toString();
    		System.out.println("접속한 클라이언트 ID:"+userId);
    		System.out.println(id);
    		broadcast(String.format("* %s %s", userId, "has connected."));
           
    		sessionMap.put(userId, ss);
//          Object objList = httpSession.getServletContext().getAttribute("usrList");
//          if(objList==null) {
//              List<String> usrList = new ArrayList<>();
//              httpSession.getServletContext().setAttribute("usrList", usrList);
//              objList = usrList;
//          }
//          List<String> usrList = (List<String>) objList;
//          usrList.add(userId);
    	}catch(Exception e){
    		e.printStackTrace();
    	}
    }
 
 
    @OnClose
    public void end() {
        String usrId = ss.getId();//(String)httpSession.getAttribute("id");
        sessionMap.remove(usrId);
         
//        Object objList = httpSession.getServletContext().getAttribute("usrList");
//        List<String> usrList = (List<String>) objList;
//        usrList.remove(usrId);
        broadcast(String.format("* %s %s", usrId, "has been disconnected."));
    }
 
    // 현재 세션과 연결된 클라이언트로부터 메시지가 도착할 때마다 새로운 쓰레드가 실행되어 incoming()을 호출함
    @OnMessage
    public void incoming(String message){
    	System.out.println(message);
    	try{
	        if(message==null || message.trim().equals("")) return;
	        JSONObject jsonobj = new JSONObject(message);
	        String type = jsonobj.getString("type");
	        if(type.equals("play")){
	            broadcast(message);        	
	        }else if(type.equals("list")){
	        	JSONObject obj = new JSONObject(); 	
	        	JSONObject valueobj = new JSONObject();
	        	Set<String> keys = sessionMap.keySet();
	    		Iterator<String> it = keys.iterator();
	    	
	    		while (it.hasNext()) {
	    			String key = it.next();
	    			valueobj.put(key, sessionMap.get(key).getId()+"");    			
	    		}
	    		
	    		obj.put("type", "list");
	    		obj.put("values",valueobj);
	            broadcast(obj.toString());       
	        }else if(type.equals("ping")){
    			Session s = sessionMap.get(ss.getId());
	            try{
					s.getBasicRemote().sendText(message);   
	            }catch(IOException e) {
	    			sessionMap.remove(ss.getId());
	    			try {
	    				s.close();
	    		    }catch (IOException e1) {
	    		    	e1.printStackTrace();
	    		    }
	    			String msg = String.format("* %s %s", ss.getId(), "has been disconnected.");
	    			broadcast(msg);
	    		}
	        }    
    	}catch(JSONException e){
    		e.printStackTrace();
    	}
        
        
        
 /*
        JSONParser jsonParser = new JSONParser();
        try {
            JSONObject jsonObj = (JSONObject)jsonParser.parse(message);
            String sender = (String)jsonObj.get("sender");
            String receiver = (String)jsonObj.get("receiver");
             
            try {
                sessionMap.get(receiver).getBasicRemote().sendText(message);
                sessionMap.get(sender).getBasicRemote().sendText(message);
                return;
            } catch (IOException e) {
                e.printStackTrace();
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }
 */
    }
     
    @OnError
    public void onError(Throwable t) throws Throwable {
        System.err.println(" Chat Error: " + t.toString());
    }
    
    public int broadcast(String msg){
	    Set<String> keys = sessionMap.keySet();
		Iterator<String> it = keys.iterator();
	
		while (it.hasNext()) {
			String key = it.next();
			Session s = sessionMap.get(key);
	
			try {
				s.getBasicRemote().sendText(msg);
			}catch (IOException e) {
				sessionMap.remove(key);
				try {
					s.close();
			    }catch (IOException e1) {
			    	e1.printStackTrace();
			    }
				String message = String.format("* %s %s", key, "has been disconnected.");
				broadcast(message);
		    	return -1;
			}
		}
    	return 0;
    }
}
