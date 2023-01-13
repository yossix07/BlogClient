const myServer = "localhost";
const myPort = 5113;
const urlPrefix = "http://" + myServer + ":" + myPort + "/api/";

/**
 * signUp function sends a post request to the server to create a new user
 * @param {String} username 
 * @param {String} password 
 * @param {String} fullName 
 * @return {Number} response status
 */
export async function signUp(username, password, fullName) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ "userName": username, "password": password, "full_Name": fullName })
  };
  try {
    const response = await fetch(urlPrefix + "Users/SignUp", requestOptions);
    return response.status;
  } catch (error) {
    console.error(error);
    return false;
  }
}

/**
 * logIn function sends a post request to the server to login the user
 * @param {String} username 
 * @param {String} password 
 * @return {Number} response status
 */
export async function logIn(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ "UserName": username, "Password": password, "Full_Name": "string" })
  };
  try {
    const response = await fetch(urlPrefix + "Users/SignIn", requestOptions);
    return response.status;
  } catch (error) {
    console.error(error);
    return false;
  }
}


/**
 * getUsersWithMoreThanAvgCommentsNum function sends a get request to the server to get
 * all the user who have more than average comments number
 * @return {JSON} json object
 */
export async function getUsersWithMoreThanAvgCommentsNum() {
  const requestOptions = {
    method: 'Get',
    headers: { 'Content-Type': 'application/json' }
  };

  const response = await fetch(urlPrefix + "Users", requestOptions);

  if (response.ok) {
    const json = await response.json()
    return json;
  }
  return -1;
}

/**
 * getAllProjects function sends a get request to the server to get all projects
 * @param {Number} start_index 
 * @return {JSON} json object
 */
export async function getAllProjects(start_index) {
  const requestOptions = {
    method: 'Get',
    headers: { 'Content-Type': 'application/json' }
  };

  const response = await fetch(urlPrefix + "Projects/" + start_index, requestOptions);

  if (response.ok) {
    const json = await response.json()
    return json;
  }
  return -1;
}

/**
 * getProjectNum function sends a get request to the server to get number of projects
 * @return {Number} total number of projects
 */
export async function getProjectNum() {
  const requestOptions = {
    method: 'Get',
    headers: { 'Content-Type': 'application/json' }
  };

  const response = await fetch(urlPrefix + "Projects/", requestOptions);

  if (response.ok) {
    const json = await response.text()
    return json;
  }
  return -1;
}

/**
 * addProject function sends a post request to the server to add a new project
 * @param {String} projectName 
 * @param {String} createdTimestamp 
 * @param {String} description 
 * @param {String} homepageUrl 
 * @param {String} repositoryUrl 
 * @param {String} language 
 * @param {String} hostType 
 * @param {String} nameWithOwner 
 * @param {Number} size 
 * @param {Number} starsCount 
 * @param {Boolean} issuesEnabled 
 * @param {Number} forksCount 
 * @param {Array} versions 
 * @return {Boolean} return true if the project added successfully
 */
export async function addProject(projectName, createdTimestamp, description, homepageUrl, repositoryUrl, language, hostType,
  nameWithOwner, size, starsCount, issuesEnabled, forksCount, versions) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(
      {
        "project": {
          "id": 0,
          "name": projectName,
          "created_Timestamp": createdTimestamp,
          "description": description,
          "homepage_Url": homepageUrl,
          "repository_Url": repositoryUrl,
          "language": language,
          "repository_Id": 0,
          "likes_Count": 0,
          "comments_Count": 0
        },
        "repository": {
          "id": 0,
          "host_Type": hostType,
          "name_With_Owner": nameWithOwner,
          "size": size,
          "stars_count": starsCount,
          "issues_Enabled": issuesEnabled,
          "forks_count": forksCount
        },
        "versions": versions,
        "comments": []
      }
    )
  };
  const response = await fetch(urlPrefix + "ProjectInfos", requestOptions);

  if (response.ok) {
    return true;
  }
  return false;
}

/**
 * getProjectInfo function sends a get request to the server to get the project info
 * @param {Number} id 
 * @return {JSON} json object
 */
export async function getProjectInfo(id) {
  const requestOptions = {
    method: 'Get',
    headers: { 'Content-Type': 'application/json' }
  };

  const response = await fetch(urlPrefix + "ProjectInfos/" + id, requestOptions);

  if (response.ok) {
    const json = await response.json()
    return json;
  }
  return false;
}


/**
 * toggleLike function sends a post request to the server to toggle a like for a project
 * @param {String} username 
 * @param {Number} projectID 
 * @param {String} timestamp 
 * @return {Boolean} return true if the like toggled successfully
 */
export async function toggleLike(username, projectID, timestamp) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ "userName": username, "project_Id": projectID, "time": timestamp })
  };

  const response = await fetch(urlPrefix + "Likes/ToggleLike", requestOptions);

  if (response.ok) {
    return true;
  }
  return false;
}


/**
 * getProjectsUserDontLike function sends a get request to the server to get the projects that the user don't like
 * @param {String} username 
 * @param {Number} projectID 
 * @return {JSON} json object
 */
export async function getProjectsUserDontLike(username, projectID) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };

  const response = await fetch(urlPrefix + "Likes/" + username + "/" + projectID, requestOptions);

  if (response.ok) {
    const json = await response.json()
    return json;
  }
  return false;
}

/**
 * getProjectsWithHigherVersionAndMoreThanAvgForks function sends a get request to the server to get the projects that have higher version and more than average forks
 * @param {String} version 
 * @param {Number} projectID 
 * @return {JSON} json object
 */
export async function getProjectsWithHigherVersionAndMoreThanAvgForks(version, projectID) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };
  const response = await fetch(urlPrefix + "Projects/" + version + "/" + projectID, requestOptions);

  if (response.ok) {
    const json = await response.json()
    return json;
  }
  return false;
}

/**
 * addComment function sends a post request to the server to add a comment for a project
 * @param {String} username 
 * @param {Number} projectID 
 * @param {String} timestamp 
 * @param {String} text 
 * @return {Number} response status code
 */
export async function addComment(username, projectID, timestamp, text) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ "userName": username, "project_Id": projectID, "text": text, "time": timestamp })
  };

  try {
    const response = await fetch(urlPrefix + "Comments/Comment", requestOptions);
    return response.status;
  } catch (error) {
    console.error(error);
    return false;
  }

}