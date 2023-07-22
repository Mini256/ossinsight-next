import { cancellableFetch } from '../../utils/fetch';
import { CancelablePromise } from '../../utils/promise';
import { RemoteRepoInfo } from './GHRepoSelector';

export function isRepoEquals (a: RemoteRepoInfo, b: RemoteRepoInfo) {
  return a.id === b.id;
}

export function searchRepo (text: string): CancelablePromise<RemoteRepoInfo[]> {
  return cancellableFetch(`https://api.ossinsight.io/gh/repos/search?keyword=${encodeURIComponent(text)}`)
    .then(res => res.json())
    .then(res => res.data);
}

export function getRepoText (repo: RemoteRepoInfo) {
  return repo.fullName;
}
