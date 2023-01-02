import { type } from "@testing-library/user-event/dist/type";

const myServer = "localhost";
const myPort = 5113;
const urlPrefix = "http://" + myServer + ":" + myPort + "/api/";

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

export async function addProject(projectName, createdTimestamp, description, homepageUrl, repositoryUrl, language, hostType,
  nameWithOwner, size, starsCount, issuesEnabled, forksCount, versions) {
    console.log("issuesEnabled", issuesEnabled, typeof issuesEnabled)
    const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(
      {
        "project": {
          "id": 0,
          "name":projectName,
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
  console.log("before fetch")
  const response = await fetch(urlPrefix + "ProjectInfos", requestOptions);
  console.log("after fetch")

  if (response.ok) {
    return true;
  }
  return false;
}

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

export async function toggleLike(username, projectID, timestamp) {
  console.log(username, typeof username)
  console.log(projectID, typeof projectID)
  console.log(timestamp, typeof timestamp)

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

export async function getProjectsUserDontLike(username, projectID) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };

  const response = await fetch(urlPrefix + "Likes/" + projectID + "," + username, requestOptions);

  if (response.ok) {
    const json = await response.json()
    return json;
  }
  return false;
}

export async function getProjectsWithHigherVersionAndMoreThanAvgForks(version, projectID) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };
  const response = await fetch(urlPrefix + "Projects/" + projectID + "," + version, requestOptions);

  if (response.ok) {
    const json = await response.json()
    return json;
  }
  return false;
}

export async function addComment(username, projectID, timestamp, text) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ "userName": username, "project_Id": projectID, "text": text, "time": timestamp })
  };

  const response = await fetch(urlPrefix + "Comments/AddComment", requestOptions);

  if (response.ok) {
    return true;
  }
  return false;
}